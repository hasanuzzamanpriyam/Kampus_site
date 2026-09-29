<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotStudent
{
    /**
     * Handle an incoming request.
     * Strictly prevent students from accessing any administration panels.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->isStudent()) {
            abort(403, 'Unauthorized access: Students do not have permission to access the administration panels.');
        }

        return $next($request);
    }
}
