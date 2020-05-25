<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    public function clinicService()
    {
        return $this->hasMany('App\Models\ClinicService', 'clinic_id');
    }
}
