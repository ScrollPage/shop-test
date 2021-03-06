from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import PermissionsMixin

class MyAccountManager(BaseUserManager):

    def create_user(self, email, username, password = None):
        user = self.model(
            email = self.normalize_email(email),
            username = username
        )

        user.set_password(password)
        user.save(using = self._db)

        return user

    def create_superuser(self, email, username, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True

        user.save(using = self._db)

        return user



class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name = "email", max_length = 60, unique = True)
    username = models.CharField(max_length = 30, unique = True)
    date_joined = models.DateTimeField(verbose_name = "date joined", auto_now_add = True)
    last_login = models.DateTimeField(verbose_name = "last_login", auto_now = True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    avatar = models.ImageField(upload_to="user_avatars/%Y/%m/%d", blank=True)
    is_active = models.BooleanField(default = False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def get_url(self):
        try:
            return self.avatar.url
        except ValueError:
            return None

@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user = instance)