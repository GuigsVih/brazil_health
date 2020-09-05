<?php

use App\Models\Clinic;
use Illuminate\Database\Seeder;

class ClinicSeeder extends Seeder
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
            $clinic = new Clinic();
            $clinic->nome = $faker->name;
            $clinic->save();
        }
    }
}
