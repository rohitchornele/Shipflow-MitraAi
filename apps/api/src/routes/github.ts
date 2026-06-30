import { Router } from 'express';
import { githubService } from '@repo/trpc/server/services';
import { githubWebhooks } from '@repo/services/github/utils/github-webhook';

const router = Router();

router.get('/setup', async (req, res) => {
  try {
    const installationId = Number(req.query.installation_id);
    const userId = req.query.state as string;

    if (!installationId || !userId) {
      return res.status(400).send('Missing installation_id or state');
    }

    console.log('istallation id = ', installationId);
    console.log('user id = ', userId);

    await githubService.saveInstallation(userId, installationId);

    console.log('after save install service');

    return res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/github`);
  } catch (error) {
    console.error(error);

    return res.status(500).send('Failed to complete GitHub installation');
  }
});

router.post('/webhook', async (req, res) => {
  console.log('========== GITHUB WEBHOOK ==========');

  try {
    await githubWebhooks.verifyAndReceive({
      id: req.header('x-github-delivery')!,
      name: req.header('x-github-event') as any,
      signature: req.header('x-hub-signature-256')!,
      payload: (req as any).rawBody,
    });
    console.log('✅ Webhook processed successfully');

    return res.sendStatus(200);
  } catch (error) {
    console.error('❌ Webhook verification failed');
    console.error(error);

    return res.sendStatus(401);
  }
});

export default router;
