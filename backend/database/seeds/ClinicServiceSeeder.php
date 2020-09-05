<?php

use Illuminate\Database\Seeder;
use App\Models\ClinicService;

class ClinicServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 15; $i++) {
            $faker = \Faker\Factory::create();
            $service = new ClinicService();
            $service->nome = $faker->name;
            $service->valor = mt_rand(1, 100);
            $service->clinic_id = mt_rand(1, 10);
            $service->save();
        }
    }
}
