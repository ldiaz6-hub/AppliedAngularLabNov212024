# List out the tasks available
default:
  @just --list

# Install the dpendencies and startup Visual Studio Code and have it run our application
code: 
  @cd src/frontend && code -r . 


