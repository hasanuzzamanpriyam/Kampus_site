<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of all services.
     */
    public function index()
    {
        $services = Service::orderBy('sort_order', 'asc')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        $nextOrder = (Service::max('sort_order') ?? 0) + 1;
        $nextNumber = str_pad($nextOrder, 2, '0', STR_PAD_LEFT);

        return Inertia::render('Admin/Services/Form', [
            'service' => null,
            'nextNumber' => $nextNumber,
            'nextOrder' => $nextOrder,
        ]);
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'number' => 'nullable|string|max:10',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:100',
            'description' => 'required|string',
            'bullets' => 'nullable|array',
            'bullets.*' => 'nullable|string|max:255',
            'image' => 'nullable',
            'image_file' => 'nullable|image|max:5120',
            'gradient' => 'nullable|string|max:255',
            'glow_color' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        // Filter out empty bullet points
        if (isset($validated['bullets'])) {
            $validated['bullets'] = array_values(array_filter($validated['bullets'], fn($b) => !empty(trim($b))));
        }

        // Handle image upload if a file was provided
        if ($request->hasFile('image_file')) {
            $validated['image'] = '/storage/' . $request->file('image_file')->store('services', 'public');
        }

        unset($validated['image_file']);

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Form', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'number' => 'nullable|string|max:10',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:100',
            'description' => 'required|string',
            'bullets' => 'nullable|array',
            'bullets.*' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'gradient' => 'nullable|string|max:255',
            'glow_color' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

        // Filter out empty bullet points
        if (isset($validated['bullets'])) {
            $validated['bullets'] = array_values(array_filter($validated['bullets'], fn($b) => !empty(trim($b))));
        }

        // Handle image upload if a file was provided
        if ($request->hasFile('image_file')) {
            $validated['image'] = '/storage/' . $request->file('image_file')->store('services', 'public');
        }

        unset($validated['image_file']);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    /**
     * Toggle the active status of the specified service.
     */
    public function toggleStatus(Service $service)
    {
        $service->update([
            'is_active' => !$service->is_active,
        ]);

        return back()->with('success', 'Service visibility status updated.');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
