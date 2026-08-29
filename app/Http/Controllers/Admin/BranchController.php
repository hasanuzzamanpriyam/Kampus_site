<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of all Global Branches.
     */
    public function index()
    {
        $branches = Branch::orderBy('sort_order', 'asc')->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Branches/Index', [
            'branches' => $branches,
        ]);
    }

    /**
     * Show the form for creating a new Branch.
     */
    public function create()
    {
        return Inertia::render('Admin/Branches/Form', [
            'branch' => null,
        ]);
    }

    /**
     * Store a newly created Branch in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'country_code' => 'required|string|max:10',
            'country_name' => 'required|string|max:255',
            'cities' => 'required|string|max:255',
            'status_text' => 'required|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['country_code'] = strtoupper(trim($validated['country_code']));
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);

        Branch::create($validated);

        return redirect()->route('admin.branches.index')
            ->with('success', 'Global Branch created successfully.');
    }

    /**
     * Show the form for editing the specified Branch.
     */
    public function edit(Branch $branch)
    {
        return Inertia::render('Admin/Branches/Form', [
            'branch' => $branch,
        ]);
    }

    /**
     * Update the specified Branch in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        $validated = $request->validate([
            'country_code' => 'required|string|max:10',
            'country_name' => 'required|string|max:255',
            'cities' => 'required|string|max:255',
            'status_text' => 'required|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['country_code'] = strtoupper(trim($validated['country_code']));
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);

        $branch->update($validated);

        return redirect()->route('admin.branches.index')
            ->with('success', 'Global Branch updated successfully.');
    }

    /**
     * Toggle active status of the specified Branch.
     */
    public function toggleStatus(Branch $branch)
    {
        $branch->update([
            'is_active' => !$branch->is_active,
        ]);

        return back()->with('success', 'Branch status updated.');
    }

    /**
     * Remove the specified Branch from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('admin.branches.index')
            ->with('success', 'Global Branch deleted successfully.');
    }
}
