<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(
            'users',
            function (Blueprint $table) {
                $table->string('cpf', 11)->nullable();
                $table->string('cep', 8)->nullable();
                $table->string('public_place')->nullable();
                $table->string('neighborhood')->nullable();
                $table->string('city')->nullable();
                $table->char('state', 2)->nullable();
                $table->integer('number')->nullable();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
