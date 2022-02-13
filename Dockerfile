FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client && apt-get install

RUN mkdir /pelinkcan
WORKDIR /pelinkcan

COPY Gemfile /pelinkcan/Gemfile
COPY Gemfile.lock /pelinkcan/Gemfile.lock

RUN gem install pg
RUN bundle install --without production

COPY . /pelinkcan

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["sh", "entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]