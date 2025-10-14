# Odinbook

Welcome to Odinbook! \
This is a social media site clone inspired by X (Twitter), built as the final project of The Odin Project full-stack JavaScript curriculum.

Live Demo: https://ak-odinbook.netlify.app/ \
(You can sign in using your GitHub account!)

## Overview

Odinbook allows users to connect and interact through posts, comments, and follow requests — just like X. Users can edit their profiles, upload pictures, and view other users’ profiles.

## Tech Stack

Frontend: React.js \
Backend: Node.js, Express.js, REST API \
Database: PostgreSQL (NeonDB) + Prisma ORM \
Storage: Supabase (for images) \
Authentication: Passport (GitHub OAuth), JSON Web Token (JWT) \
File Handling: Multer

## Features

User Authentication: Secure login via GitHub OAuth using Passport or email. \
JWT-based authorization for stateless access control. \
Follow system: Send, accept, and manage follow requests. \
CRUD operations: Create, edit, and delete posts and comments. \
Profile customization: Update display name and profile picture. \
Image uploads: Managed using Multer and stored on Supabase.
