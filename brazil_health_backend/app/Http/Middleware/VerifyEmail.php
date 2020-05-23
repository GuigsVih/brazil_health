<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

/**
 * Middleware para conferir se e-mail já está cadastrado.
 *
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
class VerifyEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $email = $request->only('email');
        $result = User::where('email', '=', $email)
            ->get();
        if (count($result) > 0) {
            return response()->json(['email' => 'Email já cadastrado.'], 406);
        }
        return $next($request);
    }
}
