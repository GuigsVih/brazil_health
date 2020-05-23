<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

/**
 * Model de usuário implementando as configurações do JWT
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class User extends Authenticatable implements JWTSubject
{
   use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'lastname', 'role'
    ];

   /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
   protected $hidden = [
      'password', 'remember_token',
   ];

   public function getJWTIdentifier()
   {
      return $this->getKey();
   }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Campo virtual para o retorno da listagem, o atributo voltar
     * com a url já pronta da foto.
     *
     * @return mixed
     */
    public function getPhotoAttribute()
    {
        if ($this->attributes['photo'] != null) {
            return Storage::url('img/' . $this->attributes['photo']);
        }
    }
}
