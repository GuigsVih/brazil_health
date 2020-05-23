<?php

use App\Http\Middleware\VerifyEmail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'AuthController@login');
Route::post('/social-login', 'AuthController@socialLogin');
Route::post('/user/register', 'UserController@register')
    ->middleware(VerifyEmail::class);
Route::post('/me', ['uses' => 'AuthController@me']);
Route::post('/logout', ['uses' => 'AuthController@logout']);
