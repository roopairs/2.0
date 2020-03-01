# Generated by Django 3.0.2 on 2020-02-25 04:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Properties', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('PropertyManagers', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tenant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=20)),
                ('place', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Properties.Property')),
                ('pm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PropertyManagers.PropertyManager')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]