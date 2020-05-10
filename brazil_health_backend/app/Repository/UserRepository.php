<?php

namespace App\Repository;

use App\Utils\SaveFileFromBinary;
use App\Models\User;
/**
 * Repositório de usuários.
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class UserRepository
{
    private $_file;

    public function __construct(SaveFileFromBinary $file)
    {
        $this->_file = $file;
    }
    /**
     * Registra usuário
     *
     * @param array $data do usuario.
     *
     * @return void
     */
    public function register(array $data): void
    {
        $user = new User();
        $user->fill($data);
        $user->password = bcrypt($data['password']);
        $user->photo = $this->_file->saveImage($data);
        $user->save();
    }


}
