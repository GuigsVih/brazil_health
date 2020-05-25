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
     * @return object
     */
    public function register(array $data): object
    {
        $user = new User();
        $user->fill($data);
        $user->password = bcrypt($data['password']);
        $user->photo = $this->_file->saveImage($data);
        $user->save();

        return $user;
    }

    /**
     * Atualiza dados do usuário.
     *
     * @param array $data dados do usuario.
     * @param int   $id   do usuário.
     *
     * @return void
     */
    public function update(array $data, int $id): void
    {
        $user = User::find($id);
        $user->fill($data);
        if ($data['password']) {
            $user->password = bcrypt($data['password']);
        }
        if ($data['file']) {
            $user->photo = $this->_file->saveImage($data, $user);
        }
        $user->save();
    }


}
