<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $this->mapUserForInertia($request->user()),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Map the User model into a plain array for Inertia shared props.
     */
    protected function mapUserForInertia($user): ?array
    {
        if (! $user) {
            return null;
        }

        // Prefer full_name if present, fall back to name attribute
        $displayName = $user->full_name ?? $user->name ?? '';

        return [
            'id' => $user->id,
            'name' => $displayName,
            'full_name' => $user->full_name ?? null,
            'email' => $user->email,
            'role' => $user->role, // <-- Add this line
            'avatar' => $user->profile_picture ?? null,
            'email_verified_at' => $user->email_verified_at?->toDateTimeString() ?? null,
            'two_factor_enabled' => $user->two_factor_enabled ?? false,
            'created_at' => $user->created_at?->toDateTimeString() ?? null,
            'updated_at' => $user->updated_at?->toDateTimeString() ?? null,
        ];
    }
}
