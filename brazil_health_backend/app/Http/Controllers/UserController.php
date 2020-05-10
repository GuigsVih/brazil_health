<?php

namespace App\Http\Controllers;

use App\Repository\UserRepository;
use Illuminate\Http\Request;

/**
 * Controller para usuários.
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class UserController extends Controller
{

    private $_repository;

    public function __construct(UserRepository $repository)
    {
        $this->_repository = $repository;
    }
    /**
     * Registro de usuários.
     *
     * @param Request $request dados da req.
     *
     * @return object
     */
    public function register(Request $request)
    {
        $this->_repository->register($request->all());
    }
}
