import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const supabase = req.app.locals.supabase;

    // Validação básica
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, senha e username são obrigatórios' });
    }

    // Sign up com Supabase
    const { data: { user }, error: signUpError } = await supabase.auth.signUpWithPassword({
      email,
      password,
    });

    if (signUpError) {
      return res.status(400).json({ error: signUpError.message });
    }

    // Criar profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          username,
          email,
          bio: '',
          avatar_url: null,
          theme: 'light',
        }
      ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      token,
      user: { id: user.id, email, username }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const supabase = req.app.locals.supabase;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      token,
      user: {
        id: user.id,
        email,
        username: profile?.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
