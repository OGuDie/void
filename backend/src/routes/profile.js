import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get profile by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const supabase = req.app.locals.supabase;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get my profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const supabase = req.app.locals.supabase;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { bio, avatar_url, theme, username } = req.body;
    const supabase = req.app.locals.supabase;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        bio,
        avatar_url,
        theme,
        username,
        updated_at: new Date()
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
