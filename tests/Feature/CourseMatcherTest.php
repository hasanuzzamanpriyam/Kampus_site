<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseMatcherTest extends TestCase
{
    use RefreshDatabase;
    public function test_course_matcher_endpoint_returns_success()
    {
        $response = $this->postJson('/api/course-matcher', [
            'destination' => 'Canada',
            'level' => 'Undergraduate',
            'field' => 'Computer Science',
            'budget' => '£25,000 - £35,000/year',
            'start_date' => 'Next year',
            'english_status' => 'Exempt',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'count',
            'results',
        ]);
    }

    public function test_course_matcher_with_anywhere_and_not_sure()
    {
        $response = $this->postJson('/api/course-matcher', [
            'destination' => 'Anywhere',
            'level' => 'Not sure yet',
            'field' => 'Not sure',
            'budget' => 'Flexible / not sure yet',
            'start_date' => 'Just exploring for now',
            'english_status' => 'Not sure what is required',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'count',
            'results',
        ]);
    }

    public function test_course_matcher_lead_endpoint()
    {
        $response = $this->postJson('/api/course-matcher-lead', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+123456789',
            'destination' => 'Canada',
            'level' => 'Undergraduate',
            'field' => 'Computer Science',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
        ]);
    }
}
