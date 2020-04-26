<?php

namespace App\Repository;

use Illuminate\Support\Facades\Auth;

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
    public function login(array $data) : object
    {
        if ($token = Auth::attempt($data)) {
            return response()->json(
                [
                    'user'  => Auth::user(),
                    'token' => $token
                ], 200
            );
        }

        return response()->json('Usuário e/ou senha incorretos', 403);
    }

    /**
     * Desloga o usuário da sessão.
     *
     * @return void
     */
    public function logout() : void
    {
        Auth::logout();
    }
}
