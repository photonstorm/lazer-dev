# Lazer Dev

This is a temporary development repo for [Lazer](https://github.com/photonstorm/lazer). In here we store all of our testing files as the framework is built out. Once released this repo will be deleted and useful code will be migrated to the Lazer Examples repo.

**Feel free to issue pull requests against this repo to add new tests**

## Setting up Lazer Dev

All of the tests use SystemJS to import the required modules.

It uses the following baseURL:

```
System.baseURL = '../../lazer/src/';
```

Which means you need to check-out the [Lazer repo]() so it sits at the same level as the lazer-dev repo in your file system:

```
/usr/local/home/lazer-dev/
/usr/local/home/lazer/
```

Or similar for your own set-up. If you've renamed the 'lazer' folder then you need to edit the 'baseURL' (but please don't resubmit this in a pull request, as we'll never merge it)

Follow development on [Twitter](https://twitter.com/lazerjs)
