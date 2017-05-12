<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Comment;
use AppBundle\Entity\Course;
use AppBundle\Entity\Lesson;
use AppBundle\Form\CommentType;
use AppBundle\Form\CourseType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends Controller
{
    /**
     * @Route("/api/courses")
     * @Method("GET")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function adminCoursesAction()
    {
        $courses = $user = $this->get('security.token_storage')->getToken()->getUser()
            ->getAdminCourses();

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($courses, 'json', array('groups' => array('export')));

        return new Response($data);
    }

    /**
     * @Route("/api/courses")
     * @Method("POST")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function newCourseAction(Request $request)
    {
        $message = 'An error has occurred.';
        $course = new Course();

        $form = $this->createForm(CourseType::class, $course);
        $form->submit($request->request->all());

        if (!empty($request->files->all())) {
            $course->setImage($request->files->get('image'));
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $message = 'Course was created successfully.';

            $course = $form->getData();
            $user = $this->getUser();

            $course->setSlug($course->getName());
            $course->setAdmin($user);

            $file = $course->getImage();
            $fileName = $this->get('app.file_uploader')->upload($file);
            $course->setImage($fileName);

            $em = $this->getDoctrine()->getManager();
            $em->persist($course);
            $em->persist($user);
            $em->flush();

            return new JsonResponse(['message' => $message]);
        } else {
            $message = (string) $form->getErrors(true, false);
        }


        return new JsonResponse(['message' => $message], 400);
    }

    /**
     * @Route("/api/user")
     * @Method("GET")
     */
    public function getUserAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($user, 'json', array('groups' => array('courses')));

        return new Response($data);
    }

    /**
     * @Route("/api/enroll/{id}")
     * @Method("GET")
     */
    public function enrollAction(Course $course)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        if (!$course->getUsers()->contains($user)) {
            $course->addUser($user);
            $user->addEnrolledCourse($course);

            $em = $this->getDoctrine()->getManager();
            $em->persist($course);
            $em->persist($user);
            $em->flush();

            return new JsonResponse(['message' => 'You have been successfully enrolled.']);
        }

        return new JsonResponse(['message' => 'Error.'], 400);
    }

    /**
     * @Route("/api/lessons/{id}")
     * @Method("GET")
     */
    public function lessonAction(Lesson $lesson)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $course = $lesson->getCourse();

        if ($course->getUsers()->contains($user) || $course->getAdmin() == $user) {
            $serializer = $this->get('serializer');
            $data = $serializer->serialize($lesson, 'json', array('groups' => array('export2')));

            return new Response($data);
        }

        return new JsonResponse(['message' => 'Error.'], 400);
    }
    
    /**
     * @Route("/api/comment/{id}")
     * @Method("POST")
     */
    public function createCommentAction(Lesson $lesson, Request $request)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $course = $lesson->getCourse();
        $message = 'Error.';

        if ($course->getUsers()->contains($user) || $course->getAdmin() == $user) {
            $comment = new Comment();

            $form = $this->createForm(CommentType::class, $comment);
            $form->submit(json_decode($request->getContent(), true));

            if ($form->isSubmitted() && $form->isValid()) {
                $message = 'Comment was successfully created.';

                $comment = $form->getData();
                $comment->setLesson($lesson);
                $comment->setUser($user);

                $em = $this->getDoctrine()->getManager();
                $em->persist($comment);
                $em->persist($lesson);
                $em->persist($user);
                $em->flush();

                return new JsonResponse(['message' => $message]);
            } else {
                $message = (string) $form->getErrors(true, false);
            }
        }

        return new JsonResponse(['message' => $message], 400);
    }
}
