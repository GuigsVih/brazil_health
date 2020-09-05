<?php

namespace App\Repository;

use App\Models\ClinicService;
use App\Models\Clinic;
/**
 * Repositório de busca.
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class SearchRepository
{
    /**
     * Pega 10 clinícas dos registros.
     *
     * @return object
     */
    public function someEnterprises(): object
    {
        $clinics = Clinic::take(10)
            ->get();
        return $clinics;
    }

    /**
     * Serviços relacionados com clínicas.
     *
     * @param string $param dados de procura.
     *
     * @return object
     */
    public function lookingForServices(string $param): object
    {
        $services = ClinicService::with('clinic')
            ->where('nome', 'like', '%' . $param . '%')
            ->get();

        return $services;
    }

    /**
     * Procura por clinicas.
     *
     * @param string $param dados de procura.
     *
     * @return object
     */
    public function lookingForCompanies(string $param): object
    {
        $companies = Clinic::where('nome', 'like', '%' . $param . '%')
            ->get();

        return $companies;
    }


}
