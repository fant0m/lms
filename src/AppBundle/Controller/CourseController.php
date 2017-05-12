<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Course;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    /**
     * @Route("/courses")
     * @Method("GET")
     */
    public function latestCoursesAction()
    {
        $courses = $this->getDoctrine()
            ->getRepository('AppBundle:Course')
            ->findLatest();

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($courses, 'json', array('groups' => array('public')));

        return new Response($data);
    }

    /**
     * @Route("/courses/{slug}")
     * @Method("GET")
     */
    public function getPublicCourse(Course $course)
    {
        $serializer = $this->get('serializer');
        $data = $serializer->serialize($course, 'json', array('groups' => array('public')));

        return new Response($data);
    }
}
