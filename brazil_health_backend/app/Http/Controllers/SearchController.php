<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use App\Repository\SearchRepository;
use Illuminate\Http\Request;

/**
 * Controller para barra de pesquisa
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class SearchController extends Controller
{

    private $_repository;

    public function __construct(SearchRepository $repository)
    {
        $this->_repository = $repository;
    }

    /**
     * Solicita 10 clinicas
     *
     * @return object
     */
    public function someEnterprises(): object
    {
        $clinics = $this->_repository->someEnterprises();

        return response()->json($clinics, 200);
    }
    /**
     * Faz a pesquisa por clinica e serviços de clinica.
     *
     * @param Request $request dados da req
     *
     * @return object
     */
    public function search(Request $request): object
    {
        $data = $request->only('params');

        if (strlen($data['params']) == 0) {
            $clinics = $this->_repository->someEnterprises();
            return response()->json(['companies' => $clinics], 200);
        }

        $services = $this->_repository->lookingForServices($data['params']);
        $companies = $this->_repository->lookingForCompanies($data['params']);

        return response()->json(['companies' => $companies, 'services' => $services], 200);
    }
}
