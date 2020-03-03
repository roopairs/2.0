from django.contrib.auth import get_user_model
from django.test.testcases import TestCase


class TestUser(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.create_user(email="test@test.com", first_name="Test", last_name="User")

    def test_str(self):
        self.assertEqual("Test User", str(self.user))

    def test_get_full_name(self):
        self.assertEqual("Test User", self.user.get_full_name())

    def test_get_short_name(self):
        self.assertEqual("Test U.", self.user.get_short_name())
