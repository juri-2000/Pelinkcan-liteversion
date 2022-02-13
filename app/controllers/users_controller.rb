class UsersController < ApplicationController

    def index 
      @user = User.find(params[:id])
      @userinfo = current_user.id
    end

    def edit
      @user = User.find(params[:id])
    end

    def update
    user = User.find(params[:id])
    user.update(user_params)
    redirect_to user_path(user.id)  
    end

private
  def user_params
    params.require(:user).permit(:name, :email, :image)  
  end
end
