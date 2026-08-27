<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CountryController extends Controller
{
    /**
     * Display a listing of countries.
     */
    public function index(): Response
    {
        $countries = Country::withCount('universities')->orderBy('name', 'asc')->get();

        // Seed default destination countries if table is empty
        if ($countries->isEmpty()) {
            $defaultCountries = [
                ['name' => 'United Kingdom', 'slug' => 'united-kingdom'],
                ['name' => 'United States', 'slug' => 'united-states'],
                ['name' => 'Finland', 'slug' => 'finland'],
                ['name' => 'United Arab Emirates', 'slug' => 'united-arab-emirates'],
                ['name' => 'Canada', 'slug' => 'canada'],
                ['name' => 'Australia', 'slug' => 'australia'],
            ];

            foreach ($defaultCountries as $c) {
                Country::create($c);
            }

            $countries = Country::withCount('universities')->orderBy('name', 'asc')->get();
        }

        return Inertia::render('Admin/Countries/Index', [
            'countries' => $countries,
        ]);
    }

    /**
     * Show the form for creating a new country.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Countries/Form', [
            'country' => null,
        ]);
    }

    /**
     * Store a newly created country in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:countries,slug',
        ]);

        Country::create($validated);

        return redirect()->route('admin.countries.index')
            ->with('success', 'Country created successfully.');
    }

    /**
     * Show the form for editing the specified country.
     */
    public function edit(int $id): Response
    {
        $country = Country::findOrFail($id);

        return Inertia::render('Admin/Countries/Form', [
            'country' => $country,
        ]);
    }

    /**
     * Update the specified country in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $country = Country::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:countries,slug,' . $country->id,
        ]);

        $country->update($validated);

        return redirect()->route('admin.countries.index')
            ->with('success', 'Country updated successfully.');
    }

    /**
     * Remove the specified country from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return redirect()->route('admin.countries.index')
            ->with('success', 'Country deleted successfully.');
    }
}
