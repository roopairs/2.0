# Generated by Django 3.0.2 on 2020-05-14 04:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tools', '0005_token_lastaccessed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='token',
            name='isPm',
        ),
        migrations.RemoveField(
            model_name='token',
            name='isTenant',
        ),
    ]
