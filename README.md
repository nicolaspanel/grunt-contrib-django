[![Build Status](https://travis-ci.org/nicolaspanel/grunt-contrib-django.svg?branch=master)](https://travis-ci.org/nicolaspanel/grunt-contrib-django)

# grunt-contrib-django

Grunt tasks to run [common django commands](https://docs.djangoproject.com/en/dev/ref/django-admin/).
Tested commands (should work for any cmd BTW):
 - `manage.py`:
   - [test](https://docs.djangoproject.com/en/dev/ref/django-admin/#test-app-or-test-identifier)
   - [dumpdata](https://docs.djangoproject.com/en/dev/ref/django-admin/#dumpdata-app-label-app-label-app-label-model)
 - `django-admin.py`:
   - [compilemessages](https://docs.djangoproject.com/en/dev/ref/django-admin/#compilemessages)

NOTICE: feel free to complete this list based on your own experience :)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-django --save-dev
```

## Usage

### Basic gruntfile.js
```js
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        'django-manage': {
            options: {
                app: 'myApp',
                // only if your 'manager.py' is on another path
                manage_path: './path/to/manage/'
            },
            tests: {
                options: {
                    command: 'test',
                    args: [
                        'myApp/tests',
                        '--pattern="*Tests.py"',
                        '--settings="myApp.settings.tests"'
                    ]
                }
            },
            dump: {
                options: {
                    command: 'dumpdata',
                    args: [
                        '--format=json',
                        '--indent=4',
                        'myApp',                       // return only on application's models
                        '> ./path/to/output_file.json' // save in file
                    ]
                }
            }
        },
        'django-admin': {
            options: {
                app: 'myApp'
            },
            'compile': {
                options: {
                    command: 'compilemessages',
                    verbose: true
                }
            }
        }
    });

    grunt.registerTask('test', ['django-manage:test']);
    grunt.registerTask('compile', ['django-admin:compile']);
    grunt.registerTask('dump', ['django-manage:dump']);
    grunt.registerTask('default', ['test']);

    grunt.loadNpmTasks('grunt-contrib-django');
};
```

### Calling tasks
To run a `dumpdata` command you should run the following:

```shell
grunt dump // This will run 'python manage.py dumpdata --format=json --indent=4 myApp > ../path/to/output_file.json'
```
or
```shell
grunt django-manage:dump // which will also run 'python manage.py dumpdata --format=json --indent=4 myApp > ./path/to/output_file.json'
```


## License
[The MIT license](https://github.com/nicolaspanel/grunt-contrib-django/blob/master/License.txt)
