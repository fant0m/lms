<?php
// src/AppBundle/EventListener/JWTCreatedListener.php
namespace AppBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
/**
 * Created by PhpStorm.
 * User: tomsh
 * Date: 12.05.2017
 * Time: 8:30
 */
class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();

        $payload       = $event->getData();
        $payload['email'] = $event->getUser()->getEmail();
        $payload['username'] = $event->getUser()->getUsername();

        $event->setData($payload);
    }
}