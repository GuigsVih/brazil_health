<?php

namespace App\Repository;

use App\Models\SocialUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;

/**
 * Repositório de autenticação
 *
 * @author Guilherme Vilela <guivo11@gmail.com>
 */
class AuthRepository
{
    /**
     * Verifica login.
     *
     * @param $data contendo email e senha.
     *
     * @return mixed
     */
    public function login(array $data): object
    {
        if ($token = Auth::attempt($data)) {
            return response()->json(
                [
                    'user'  => Auth::user()->load('social'),
                    'token' => $token
                ],
                200
            );
        }

      return response()->json('Usuário e/ou senha incorretos', 403);
   }

    /**
     * Login social para Facebook.
     *
     * @param array $data dados do usuário.
     *
     * @return object
     */
    public function socialLogin(array $data): object
    {
        $user = User::where('email', '=', $data['facebook']['email'])
            ->first();
        if (count((array) $user) > 0) {
            $socialUser = SocialUser::where('email', '=', $data['facebook']['email'])
                ->first();
            if (!count((array) $socialUser) > 0) {
                $newSocialUser = new SocialUser();
                $newSocialUser->provider = $data['provider'];
                $newSocialUser->photo = $data['photoUrl'];
                $newSocialUser->provider_id = $data['id'];
                $newSocialUser->email = $data['facebook']['email'];
                $newSocialUser->save();
                $user->social_id = $newSocialUser->id;
                $user->save();
            }
            if ($token = auth()->login($user)) {
                return response()->json(
                    [
                        'user' => Auth::user()->load('social'),
                        'token' => $token,
                    ]
                );
            }
        } else {
            $user = new User();
            $user->email = $data['facebook']['email'];
            $user->password = bcrypt(mt_rand(1, 100000));
            $user->name = $data['facebook']['first_name'];
            $user->lastname = $data['facebook']['last_name'];
            $user->role = 'pacient';
            $socialUser = new SocialUser();
            $socialUser->provider = $data['provider'];
            $socialUser->photo = $data['photoUrl'];
            $socialUser->provider_id = $data['id'];
            $socialUser->email = $data['facebook']['email'];
            $socialUser->save();
            $user->social_id = $socialUser->id;
            $user->save();
            if ($token = auth()->login($user)) {
                return response()->json(
                    [
                        'user' => Auth::user()->load('social'),
                        'token' => $token,
                    ]
                );
            }
        }
        return response()->json();
    }

    /**
     * Desloga o usuário da sessão.
     *
     * @return void
     */
    public function logout(): void
    {
        Auth::logout();
    }
}
