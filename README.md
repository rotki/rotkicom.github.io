# Robin the Accounting Bird

This is the source of the rotki's blog. It's loosely based on the [Hyde theme](https://github.com/poole/hyde).


## Setting up the preview environment

If you have never previewed the blog locally, you might need to install some dependencies.

### Setting Ruby Version Manager
First, you might need to install [RVM](https://rvm.io/rvm/install).

After following the instructions above, you should be able to call `rvm` from your terminal.

### Installing the latest Ruby version
Next you need to install the latest version of Ruby. This can be done by running the following command.

```bash
rvm install ruby --latest
```

After the command completes, set the default version running the following: 
```bash
rvm use ruby --default
```

And finally verify that running the version command returns the same version that was just installed.
```bash
ruby -v
```

### Finally 
It's now time to install the dependencies required to run the preview environment.
To do so run:

```bash
bundle install
```

After the successful installation of dependencies the only thing remaining is running the command to preview your changes.

## Previewing changes

You can preview an pending changes to the blog locally by running the following command: 

```bash
bundle exec jekyll serve
```

You should see something like the following in your terminal:

```bash
 Auto-regeneration: enabled for '/home/kelsos/development/repos/rotki/rotkicom.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

If you open your browser in the specified `Server Address` you should now be able to preview all the changes locally.
