json.array!(@portfolio_posts) do |portfolio_post|
  json.extract! portfolio_post, :title, :content
  json.url portfolio_post_url(portfolio_post, format: :json)
end
