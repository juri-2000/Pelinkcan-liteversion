class TagsController < ApplicationController
  def create
    @tag = Tag.new(tag_params)
    @tag.save
  end

  def first_create(resourse)
    @tag = Tag.new(user_id: resource.id,name: "all")
    @tag.save
    redirect_to links_path
  end

  private
  def tag_params
    params.require(:tag).permit(:name)
  end
end
