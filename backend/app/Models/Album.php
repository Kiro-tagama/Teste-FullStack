<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['title', 'year', 'cover_url'];
    
    public function tracks()
    {
        return $this->hasMany(Track::class);
    }
}
