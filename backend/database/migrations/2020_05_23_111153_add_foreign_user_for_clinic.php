<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignUserForClinic extends Migration
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
            // $table->unsignedInteger('clinic_id');
            // $table->foreign('clinic_id')->references('id')->on('clinics')->onDelete('no action')->onUpdate('no action');
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
      //
   }
}
