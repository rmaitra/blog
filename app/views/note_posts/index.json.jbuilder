json.array!(@note_posts) do |note_post|
  json.extract! note_post, :title, :content
  json.url note_post_url(note_post, format: :json)
end
