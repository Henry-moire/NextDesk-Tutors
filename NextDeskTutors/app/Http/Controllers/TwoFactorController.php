<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PragmaRX\Google2FA\Google2FA;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // If the user has no 2FA secret, generate one + recovery codes
        if (!$user->two_factor_secret) {
            $google2fa = new Google2FA();

            $user->forceFill([
                'two_factor_secret' => encrypt($google2fa->generateSecretKey()),
                'two_factor_recovery_codes' => encrypt(json_encode(
                    collect(range(1, 8))->map(fn () => Str::random(10))->toArray()
                )),
            ])->save();
        }

        // Render the Inertia page
        return Inertia::render('TwoFactorSetup', [
            'qrCode' => $user->twoFactorQrCodeSvg(), // QR code SVG
            'recoveryCodes' => $user->recoveryCodes(), // array of recovery codes
        ]);
    }
}
