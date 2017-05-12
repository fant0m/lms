<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends Controller
{
    /**
     * @Route("/register", name="register")
     * @Method("POST")
     */
    public function registerAction(Request $request)
    {
        $message = 'Unknown error.';
        $user = new User();
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();

            $encoder = $this->container->get('security.password_encoder');
            $user->setPassword($encoder->encodePassword($user, $user->getPassword()));

            $em = $this->get('doctrine')->getManager();
            $em->persist($user);
            $em->flush($user);

            $message = 'Registration was successful.';

            return new JsonResponse(['token' => $this->generateToken($user), 'message' => $message]);
        } else {
            $message = (string) $form->getErrors(true, false);
        }

        return new JsonResponse(['message' => $message], 400);
    }

    /**
     * Generates JWT token.
     */
    private function generateToken(User $user)
    {
        $jwtManager = $this->container->get('lexik_jwt_authentication.jwt_manager');

        return $jwtManager->create($user);
    }
}
