# Generated by Django 3.0.2 on 2020-05-14 04:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Tools', '0004_token_roopairstoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='token',
            name='lastAccessed',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
