<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePartnerPasswordSet
{
    /**
     * Ensure approved partner user has completed their password and email setup before accessing admin areas.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->hasRole('Partner') && !($user->is_super_admin ?? false)) {
            $isEmailMissing = empty($user->email) || str_ends_with($user->email, '@placeholder.local');
            $isPasswordNotSet = is_null($user->password_set_at);

            if ($isPasswordNotSet || $isEmailMissing) {
                if (!$request->routeIs('partner.setup.*') && !$request->routeIs('logout')) {
                    return redirect()->route('partner.setup.show');
                }
            }
        }

        return $next($request);
    }
}
