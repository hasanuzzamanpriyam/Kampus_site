<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Display a listing of registered users and their assigned roles.
     */
    public function index(): Response
    {
        $users = User::with('roles')->orderBy('id', 'asc')->get();
        $roles = Role::select('id', 'name')->orderBy('name', 'asc')->get();

        // Ensure User ID 1 is assigned Super Admin role if present
        $userOne = $users->firstWhere('id', 1);
        if ($userOne && !$userOne->hasRole('Super Admin')) {
            $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
            $userOne->assignRole($superAdminRole);
            $users = User::with('roles')->orderBy('id', 'asc')->get();
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the assigned roles for the specified user.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'roles' => 'nullable|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        if (isset($validated['roles'])) {
            $user->syncRoles($validated['roles']);
        } else {
            $user->syncRoles([]);
        }

        return redirect()->route('admin.users.index')
            ->with('success', "Roles updated successfully for user {$user->name}.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        if ($id === 1) {
            return redirect()->route('admin.users.index')
                ->with('error', 'The primary Super Admin user (ID 1) cannot be deleted.');
        }

        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
