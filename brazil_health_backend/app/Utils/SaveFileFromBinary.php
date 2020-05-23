<?php

namespace App\Utils;

use Illuminate\Support\Facades\Storage;

/**
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class SaveFileFromBinary
{
    /**
     * Salva arquivo no Storage.
     *
     * @return string
     */
    public function saveImage($data)
    {
        if (isset($data['file']) && $data['file'] != '') {
            $content = base64_decode($data['file']);
            $file = fopen('php://temp', 'r+');
            fwrite($file, $content);
            $photo_name = md5(
                uniqid(
                    microtime(),
                    true
                )
            ) . '.' . pathinfo($data['file_name'], PATHINFO_EXTENSION);

            Storage::disk('local')
                ->put('public/img/' . $photo_name, $file);
            return $photo_name;
        }
    }
}
