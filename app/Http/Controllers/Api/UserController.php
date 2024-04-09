<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        // search paginate in laravel for nexting the datas per page
        return UserResource::collection(
            User::query() -> orderBy ('id', 'desc') -> paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request){
        // get the data info
        $data = $request -> validated();
        // encrypt the password of data
        $data['password'] = bcrypt($data['password']);
        // get the created data into user to return it
        $user = User::create( $data );

        // This is to return the data 
        // return new UserResource( $user );

        // This is another way to get the data with a status code of 201
        return response( new UserResource( $user ), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user){
        // This is to show the user
        return new UserResource( $user );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user){
        // get the data input ,, $request is only needed if there is fillup forms
        $data = $request -> validated();
        
        // if there is password from updating, bcrypt it
        if ( isset( $data['password'] ) ){
            $data['password'] = bcrypt( $data['password'] );
        }

        // to update, just use update(' and your data ')
        $user -> update ( $data );

        return new UserResource( $user );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user){
        // this is to delete the data
        $user -> delete();
        return response ("", 204);
    }
}
