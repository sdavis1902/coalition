<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Validator;
use File;
use Storage;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ProductController extends Controller {
    public function postCreate(Request $request){
        $rules = [
            'name'     => 'required',
            'quantity' => 'required|numeric',
            'price'    => 'required|numeric'
        ];
        $v = Validator::make($request->all(), $rules);

        if( $v->fails() ){
            return ['status' => 'error', 'errors' => $v->errors()->all()];
        }

        $products = [];
        $path = storage_path('app') . '/products.json';
        if(File::exists($path)){
            $json = File::get($path);
            $products = json_decode($json, true);
        }

        $newproduct = [
            'name'     => $request->input('name'),
            'quantity' => $request->input('quantity'),
            'price'    => $request->input('price'),
            'created_at' => time()
        ];
        $products[] = $newproduct;

        $newjson = json_encode($products);

        Storage::put('products.json', $newjson);

        return ['status' => 'success', 'product' => [
            'name' => $newproduct['name'],
            'quantity' => $newproduct['quantity'],
            'price' => '$' . number_format($newproduct['price'],2),
            'total_price' => '$' . number_format($newproduct['quantity']*$newproduct['price']),
            'created_at' => date('Y/m/d h:i:s', $newproduct['created_at']),
        ]];
    }

    public function getCreate(){
        $products = [];
        $path = storage_path('app') . '/products.json';
        if(File::exists($path)){
            $json = File::get($path);
            $products = json_decode($json, true);
        }

        return view('product.create', [
            'products' => $products
        ]);
    }
}
