[![Build Status](https://travis-ci.org/rockabox/grunt-django-manage.svg?branch=master)](https://travis-ci.org/rockabox/grunt-django-manage)
[![devDependency Status](https://david-dm.org/rockabox/grunt-django-manage/dev-status.svg)](https://david-dm.org/rockabox/grunt-django-manage#info=devDependencies)

# grunt-django-manage

Grunt tasks to run common django management commands

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-django-manage --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-django-manage');
```

## Usage

### Basic setup
```js
grunt.initConfig({
    'django-manage': {
        options: {
            app: 'myApp',
            settings: 'test'
        },
        loaddata: {
            options: {
                command: 'loaddata',
                args: [
                    './fixtures/user.json',
                    './fixtures/postcodes.json'
                ]
            }
        }
    }
});
```

To run a loaddata command with django-manage you would run the following

Running
```shell
grunt django-manage:loaddata
// This will run
// python manage.py loaddata ./fixtures/user.json ./fixtures/postcodes.json --settings=myApp.settings.test
```

### Changing options in commands
```js
grunt.initConfig({
    'django-manage': {
        options: {
            app: 'myApp',
            settings: 'test'
        },
        loaddata: {
            options: {
                command: 'loaddata',
                args: [
                    './fixtures/user.json',
                    './fixtures/postcodes.json'
                ]
            },
            live: {
                settings: 'live'
            }
        }
    }
});
```

To run ``loaddata`` using live settings you would instead run

```shell
grunt django-manage:loaddata:live
// This will run
// python manage.py loaddata ./fixtures/user.json ./fixtures/postcodes.json --settings=myApp.settings.live
```

## Contribuiting

If you would like to contribute to the project please check the [CONTRIBUTING file](CONTRIBUTING.md)

## License

The license file can be found [here](Licenese.txt)
