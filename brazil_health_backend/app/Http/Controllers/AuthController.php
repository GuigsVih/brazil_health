<?php

namespace App\Http\Controllers;

use App\Repository\AuthRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Controller para autenticação do usuário.
 *
 * @author Guilherme Vilela <guivo11@gmail.com>
 */
class AuthController extends Controller
{
    private $_authRepository;

    /**
     * Instanciação de classes.
     *
     * @return void
     */
    public function __construct()
    {
        $this->_authRepository = new AuthRepository();
    }

    /**
     * Função para login.
     *
     * @param $request dados ao logar
     *
     * @return object
     */
    public function login(Request $request): object
    {
        $response = $this->_authRepository->login(
            $request->only('email', 'password', 'role')
        );
        return $response;
    }

    /**
     * Desloga usuário.
     *
     * @return void
     */
    public function logout(): void
    {
        $this->_authRepository->logout();
    }

    /**
     * Retornar usuário logado.
     *
     * @return object
     */
    public function me(): object
    {
        return response()->json(Auth::user());
    }
}
